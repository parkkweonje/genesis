# 새 글 발행 가이드 (제네시스 부업)

이 문서는 **매일 새 글을 발행하는 절차**와 **발행 전 SEO 체크리스트**를 담고 있습니다.
사이트는 빌드가 없는 순수 HTML/CSS/JS이며, GitHub Pages 프로젝트 저장소로
`https://parkkweonje.github.io/genesis/` 하위 경로에서 열립니다.

> 중요: 모든 내부 링크·에셋 경로·canonical·og:url·sitemap URL은 반드시
> `/genesis/` 로 시작하는 루트 상대경로(또는 절대 URL)로 작성합니다.

---

## 1. 발행 절차 (5단계)

### (1) 템플릿 복제
`_template/post.html` 을 복사해 새 글 폴더의 `index.html` 로 만듭니다.
폴더명(슬러그)은 영문 소문자와 하이픈만 사용합니다.

```bash
mkdir -p posts/{slug}
cp _template/post.html posts/{slug}/index.html
# 예: mkdir -p posts/smartstore-start && cp _template/post.html posts/smartstore-start/index.html
```

### (2) 제목·본문·메타·JSON-LD 채우기
복제한 파일에서 `{{...}}` 플레이스홀더를 모두 교체합니다.

- `{{SLUG}}` → 폴더명 (canonical/og:url/JSON-LD에 여러 번 등장하니 모두 교체)
- `{{CATEGORY_SLUG}}` → `start` / `online` / `ai` / `money` 중 하나
- `{{CATEGORY_NAME}}` → `부업 시작하기` / `온라인·재택 부업` / `AI·자동화 부업` / `무자본·세금·실무`
- `{{TITLE}}` → 제목(H1). 타깃 키워드를 앞쪽에, 30~35자 내외
- `{{DESCRIPTION}}` → 메타 설명 70~80자, 키워드 + 클릭 유도
- `{{DATE}}` → 발행일 `YYYY-MM-DD`
- 본문의 H2/H3, 표, 리스트, 콜아웃, 관련글을 실제 내용으로 작성

추가로 헤더 네비에서 이 글의 카테고리 `<a>`에 `aria-current="page"`를 추가합니다.

> 안전 규칙: 확정적 수익 주장("한 달 얼마 보장") 금지. 세금·법률·정책 수치는
> "국세청 등 공식 안내 확인" 문구를 함께 넣습니다. (애드센스 정책 대응)

### (3) 카테고리 목록 + 홈 최신글에 링크 추가
- `category/{CATEGORY_SLUG}/index.html` 의 `<ul class="post-list">` 에 새 글 `<li>` 추가
- `index.html` (홈) 의 `#latest` 섹션 `post-list` 맨 위에 새 글 `<li>` 추가
  (최신 3~5편만 노출하고 오래된 항목은 정리)

`<li>` 스니펫 예시:

```html
<li>
  <a class="post-item" href="/genesis/posts/{slug}/">
    <span class="post-cat">{카테고리명}</span>
    <h3>{제목}</h3>
    <p>{한 줄 요약}</p>
    <div class="post-meta">{YYYY-MM-DD} · 제네시스</div>
  </a>
</li>
```

### (4) sitemap.xml 에 URL 추가
`sitemap.xml` 에 새 글 `<url>` 블록을 추가합니다.

```xml
<url>
  <loc>https://parkkweonje.github.io/genesis/posts/{slug}/</loc>
  <lastmod>{YYYY-MM-DD}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

### (5) 배포
```bash
git add .
git commit -m "포스트: {제목}"
git push origin main
```
GitHub Pages가 자동으로 반영합니다(수 분 소요). 발행 후 실제 주소에서 열어 확인합니다.

---

## 2. 발행 전 SEO 체크리스트

- [ ] **title**: 고유하며 타깃 키워드가 앞쪽, 30~35자 내외
- [ ] **meta description**: 70~80자, 키워드 + 클릭 유도 문구
- [ ] **OG/Twitter**: og:title/description/type=article/url/image, twitter:card=summary_large_image
- [ ] **canonical**: `https://parkkweonje.github.io/genesis/posts/{slug}/` 로 정확히
- [ ] **슬러그**: 영문 소문자-하이픈, 내용과 일치
- [ ] **H 구조**: H1 1개(=제목), 논리적 H2/H3, 첫 문단 100자 내 핵심 키워드
- [ ] **내부링크**: 관련 글/카테고리로 2~3개
- [ ] **이미지 alt**: 모든 이미지에 의미 있는 alt (장식용은 `alt=""`)
- [ ] **JSON-LD**: Article, datePublished/dateModified/author/publisher/mainEntityOfPage/image
- [ ] **모바일**: 좁은 화면에서 가로 스크롤 없이 표시(표는 가로 스크롤 허용)
- [ ] **오탈자**: 최종 통독, 과장·허위 수익 주장 없음
- [ ] **경로 점검**: 모든 내부 링크·에셋이 `/genesis/` 로 시작
- [ ] **콘솔 에러 0**: 브라우저 콘솔에 에러 없음

---

## 3. 대표 이미지(og:image) 안내

현재 글은 공통 `/genesis/assets/og-default.png` 를 og:image 로 지정합니다.
이 파일은 아직 없어도 페이지는 정상 동작합니다. **대표 이미지 추가 예정**이며,
글별 이미지를 만들면 `/genesis/assets/og-{slug}.png` 로 저장하고
해당 글의 og:image / twitter:image / JSON-LD image 경로를 교체하세요.

---

## 4. 커스텀 도메인 전환 시

나중에 커스텀 도메인을 연결하면 사이트가 하위경로 없이 루트에서 열립니다.
그때는 **저장소 전체에서 `/genesis/` 를 `/` 로 일괄 치환**하면 됩니다.
치환 대상: 내부 링크, CSS/JS 경로, canonical, og:url, sitemap의 `<loc>`, robots.txt의 Sitemap.

예시(확인 후 실행 권장):
```bash
grep -rl "/genesis/" . --include="*.html" --include="*.xml" --include="*.txt"
# 내용 확인 후 필요한 파일만 치환
```
치환 후에는 위 SEO 체크리스트로 canonical/og:url이 새 도메인 기준인지 다시 확인합니다.
