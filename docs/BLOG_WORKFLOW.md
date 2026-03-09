# 블로그 작성 가이드

이 저장소는 `Jekyll + Chirpy` 기반 GitHub Pages 블로그입니다. 글 수정과 신규 글 작성에 필요한 핵심 구조와 작업 순서를 이 문서에 정리합니다.

## 구조 요약

- 사이트 전역 설정: `_config.yml`
- 작성자 정보: `_data/authors.yml`
- 실제 블로그 글: `_posts/**/**/*.md`
- 상단 탭과 프로젝트 목록: `_tabs/**`
- 레이아웃과 공통 UI: `_layouts/**`, `_includes/**`, `_sass/**`, `_javascript/**`
- GitHub Pages 배포: `.github/workflows/pages-deploy.yml`

현재 포스트는 아래처럼 저장소 안에서만 분류용 디렉터리를 나눠 쓰고 있습니다.

- 공지: `_posts/Notice/2024`
- 개발 글: `_posts/Programing/github`, `_posts/Programing/failure`
- 프로젝트 글: `_posts/Project/<프로젝트명>`
- 취미 글: `_posts/hobby/movie`

`_posts/Programing` 는 오탈자가 있는 이름이지만, 이미 저장소 구조로 쓰이고 있으므로 그대로 두는 편이 안전합니다.

## 포스트 규칙

모든 글은 YAML front matter 와 Markdown 본문으로 구성됩니다.

```md
---
layout: post
author: catfoot-dev
date: 2026-03-09 13:39:25 +09:00
categories: ["개발", "GitHub Pages"]
title: "글 제목"
tags: ["개발", "블로그", "jekyll"]
comments: true
description: "선택 사항"
---
```

필수 필드:

- `layout`: 일반 글은 `post`
- `author`: 현재는 `_data/authors.yml` 의 `catfoot-dev`
- `date`: `Asia/Seoul` 기준 게시 시각
- `categories`: 사이트 분류용 배열
- `title`: 글 제목
- `tags`: 검색과 태그 페이지에 쓰이는 배열
- `comments`: 댓글 허용 여부

선택 필드:

- `description`: 카드 설명과 SEO 설명
- `image`: 대표 이미지
- `pin: true`: 홈 상단 고정 글

## 기존 글 수정

기존 글은 해당 Markdown 파일만 수정하면 됩니다. 파일명을 바꾸면 글 URL 이 바뀔 수 있으므로, 이미 발행된 글은 파일명을 유지하는 편이 안전합니다.

예시:

- GitHub Pages 관련 글: `_posts/Programing/github/*.md`
- 장애 로그: `_posts/Programing/failure/*.md`
- 프로젝트 소개: `_posts/Project/*/*.md`

## 새 글 추가

새 글은 `tools/new-post` 스크립트로 만드는 것을 권장합니다.

초안 생성:

```bash
bash ./tools/new-post \
  --title "Jekyll 글 작성 흐름 정리" \
  --categories "개발,GitHub Pages" \
  --tags "개발,블로그,Jekyll,GitHub Pages"
```

즉시 발행용 파일 생성:

```bash
bash ./tools/new-post \
  --publish \
  --dir "Programing/github" \
  --title "Jekyll 글 작성 흐름 정리" \
  --slug "jekyll-writing-workflow" \
  --categories "개발,GitHub Pages" \
  --tags "개발,블로그,Jekyll,GitHub Pages"
```

동작 방식:

- 기본값은 `_drafts/` 아래에 초안을 만듭니다.
- `--publish` 를 주면 `_posts/<dir>/` 아래에 발행 파일을 만듭니다.
- 파일명은 `YYYY-MM-DD-slug.md` 형식으로 생성합니다.
- 한글 제목만 쓰는 경우 읽기 좋은 URL 을 위해 `--slug` 를 같이 주는 편이 좋습니다.
- 기존 숫자형 파일명 포스트는 URL 보존을 위해 그대로 두는 편이 안전합니다.

## 로컬 미리보기와 검증

의존성이 준비되어 있다면 아래 순서로 확인합니다.

환경 요구사항:

- Ruby `3.0+` 권장, 이 저장소는 `.ruby-version` 으로 `3.2.0` 을 명시합니다.
- Bundler `2.x` 권장
- 현재 GitHub Actions 도 Ruby `3.2` 로 빌드합니다.

의존성 설치:

```bash
bundle install --path vendor/bundle
```

로컬 서버 실행:

```bash
bash ./tools/run
```

정적 빌드 + 링크 검사:

```bash
bash ./tools/test
```

`tools/test` 는 `bundle exec jekyll b` 후 `htmlproofer` 를 실행합니다.

## 배포 흐름

- `main` 또는 `master` 브랜치에 push 하면 `.github/workflows/pages-deploy.yml` 이 실행됩니다.
- GitHub Actions 가 사이트를 빌드하고 GitHub Pages 에 배포합니다.
- `README.md`, `LICENSE`, `.gitignore` 변경만 있는 경우에는 배포 워크플로가 실행되지 않습니다.

## 실무 메모

- 카테고리와 태그는 한글과 영문이 섞여도 괜찮지만, 같은 개념은 표기를 통일하는 편이 좋습니다.
- 프로젝트 소개 글은 `_tabs/projects/*.md` 와 연결되는 경우가 많으니 프로젝트 페이지와 포스트를 함께 확인하는 편이 좋습니다.
- 글 본문만 다룰 때는 Node 빌드 체인은 건드릴 필요가 없습니다. 포스트 작성과 미리보기는 Ruby/Jekyll 쪽만 준비하면 충분합니다.
