---
title: "VM 初始化与 Cloudflare Tunnel 部署指南"
date: 2026-02-15
tags: ["Tech"]
image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
description: "本文记录了初始化 Linux 虚拟机身份的标准化流程，并详细说明了如何把 Cloudflare Tunnel 部署为系统服务以实现稳定的公网 SSH 访问。"
---

[前文](./mac-vm)聊了一下怎么用 Mac 配置一组虚拟机集群，这里再写一下一台全新（或重置后）的 Linux 虚拟机上，从修复主机名、重置 SSH 密钥，到配置 Cloudflare Tunnel 为系统服务的完整标准流程，也供我自己参考。

系统版本：Ubuntu 24 LTS

## 1. 系统初始化

由于我是从模版 VM 克隆的镜像，首先需要重置身份信息以避免冲突。

```bash
# 1. 设置新的主机名 (例如 vm-01)
sudo hostnamectl set-hostname vm1

# 2. 修改 hosts 文件
# 将 127.0.0.1 对应的条目修改为新的主机名
sudo vim /etc/hosts
# 修改前: 127.0.0.1 localhost vm-template
# 修改后: 127.0.0.1 localhost vm1

# 3. 重新生成 SSH 主机密钥 (解决 SSH 无法启动或连接报错的问题)
sudo rm -f /etc/ssh/ssh_host_*
sudo ssh-keygen -A

# 4. 重启 SSH 服务
sudo systemctl restart ssh
```

## 2. 安装 Cloudflare Tunnel

```bash
# 下载并安装 cloudflared (以 Ubuntu 为例)
curl -L --output cloudflared.deb [https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb)
sudo dpkg -i cloudflared.deb
```

## 3. 隧道创建与授权

先在当前用户下完成登录和隧道创建，生成必要的证书文件。

```bash
# 1. 登录授权
cloudflared tunnel login
# 点击终端显示的链接，在浏览器中授权。授权后证书会保存在 ~/.cloudflared/cert.pem

# 2. 创建隧道
# 记下返回的 Tunnel UUID
cloudflared tunnel create tunnel-vm1

# 3. 配置 DNS 路由
# 将我要用的二级域名 ***.clckkkkk.site 绑定到该隧道（看你自己）
cloudflared tunnel route dns tunnel-vm1 ***.clckkkkk.site
```

此时，`~/.cloudflared/` 目录下应该包含 `cert.pem` 和 `<UUID>.json` 文件。

## 4. 迁移至系统目录

为了将 Tunnel 注册为系统服务（开机自启），我们需要将配置文件迁移到 Linux 的标准配置目录 `/etc/cloudflared/`。

```bash
# 1. 创建系统配置目录
sudo mkdir -p /etc/cloudflared/

# 2. 将用户目录下的所有证书和配置文件移动到系统目录
sudo mv ~/.cloudflared/* /etc/cloudflared/

# 3. 修正权限 (确保 root 用户所有，保证安全性)
sudo chown -R root:root /etc/cloudflared/
sudo chmod 600 /etc/cloudflared/config.yml 2>/dev/null || true
```

### 创建配置文件

直接在该目录下创建 `config.yml`：

```bash
sudo vim /etc/cloudflared/config.yml
```

填入以下内容（注意替换 UUID）：

```yaml
tunnel: <Tunnel-UUID>
credentials-file: /etc/cloudflared/<Tunnel-UUID>.json

ingress:
  # SSH 服务入口
  - hostname: ***.clckkkkk.site
    service: ssh://localhost:22
  
  # 默认屏蔽其他请求
  - service: http_status:404

  # 如果后续有需要添加网站、数据库等开放的端口，搭配 nginx 转发后在这里绑定域名即可
```

注意：`credentials-file` 必须指向 `/etc/cloudflared/` 下的 JSON 文件路径。

## 5. 注册并启动系统服务

配置就绪后，将 Tunnel 安装为 systemd 服务。

```bash
# 1. 安装服务 (自动读取 /etc/cloudflared/config.yml)
sudo cloudflared service install

# 2. 启动服务
sudo systemctl start cloudflared

# 3. 设置开机自启
sudo systemctl enable cloudflared

# 4. 检查状态 (应显示 active running)
sudo systemctl status cloudflared
```

## 6. 客户端连接 (macOS)

在你的电脑上配置 SSH 代理，以便直接连接。这里就用我的 MacBook Pro 做示例了。注意，需要用 `brew` 提前安装好 `cloudflared`。

编辑 `~/.ssh/config`：

```bash
Host ***.clckkkkk.site
    User <你的VM用户名>
    ProxyCommand /opt/homebrew/bin/cloudflared access ssh --hostname %h
```

连接测试：

```bash
ssh <user>@***.clckkkkk.site
```

大功告成！