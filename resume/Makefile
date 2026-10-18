TYPST ?= typst
SOURCE := main.typ
PDF := output/pdf/resume.pdf

.PHONY: build watch preview publish

build:
	mkdir -p output/pdf
	$(TYPST) compile --root . $(SOURCE) $(PDF)

watch:
	mkdir -p output/pdf
	$(TYPST) watch --root . $(SOURCE) $(PDF)

preview: build
	open $(PDF)

publish: build
	cp $(PDF) ../public/resume.pdf
