# 네트워크관리사 2급 실기 · 케이블링

CommuteNet 필기 앱과 같은 디자인을 사용하는 React 학습 앱입니다. T568A/B 배열, 핀과 색상, 양 끝 결선 관계를 연습합니다. 문항은 자체 제작한 학습 자료이며 실제 케이블 검사나 공식 시험 채점을 대신하지 않습니다.

## 현재 상태

2026-10-22 React 전환과 공개 배포를 완료했습니다. [NA2-cabling 앱 열기](https://sumilee-phd.github.io/NA2-cabling/)에서 사용할 수 있습니다. 공개 사이트에서 채점·통계·새로고침 후 기록 유지를 다시 확인했습니다. 필기 앱은 [NA2-com](https://sumilee-phd.github.io/NA2-com/)입니다.

- [PRD](docs/PRD.md): 목표·기능·수용 기준
- [내용 검수 기록](docs/CONTENT_REVIEW.md): 핀 배열·적용 조건·원문 출처
- [디자인 기준](DESIGN.md): 필기 앱과 공유하는 색상·배치
- [검증 결과](docs/VERIFICATION.md): 자동 검사와 브라우저 확인, 미검증 범위
- [공개 배포 검증](docs/DEPLOYMENT.md): 배포 작업·공개 자산·채점 및 기록 유지 증거

## 로컬 실행

Node.js 22 이상과 npm을 사용합니다.

```powershell
npm ci
npm run dev
```

React 버전은 `index.html`을 파일로 직접 여는 방식 대신 개발 서버 또는 빌드 서버로 실행합니다.

```powershell
npm test
$env:BASE_PATH = '/NA2-cabling/'
npm run build
npm run preview -- --port 4183
```

미리보기 주소는 `http://127.0.0.1:4183/NA2-cabling/`입니다. GitHub Actions에서는 저장소 이름으로 기본 경로를 계산합니다.

## 주요 기능

- 개념 7개, 문항 템플릿 22개: 핀·색상 16개, 배열 2개, 유형 4개
- 무작위 문항·전선 선택지, 중복 전선 방지, 제출 후 잠금과 수동 다음 문항
- 연습은 즉시 해설, 평가는 회차 종료 후 정오·해설·오답 목록·통계 표시
- 실제 제출 이벤트와 로컬 날짜를 기준으로 통계 계산, 평가 첫 응답 정답률 분리
- 새로고침 후 회차·답안·타이머 복원, 오답 복습, JSON 백업과 검증 후 가져오기
- 실물 제작을 위한 10분 타이머와 자기점검 기록
- 다른 탭에서 기록이 바뀌면 오래된 탭의 자동 저장 중단

## 기록 보존

새 저장 키는 `na2_cabling_v1`입니다. 이전 `cabling-trainer-progress` 키는 변경하지 않습니다. 이전 앱의 불완전한 집계는 별도 보존하고 새 통계에 합산하지 않습니다. 기록은 브라우저별이며 서버 동기화나 완전한 오프라인 동작을 제공하지 않습니다.

자동 저장은 UTF-8 JSON 5 MiB까지 시도하며 브라우저의 실제 저장 공간 제한은 더 작을 수 있습니다. 백업 가져오기는 복구를 위해 최대 64 MiB까지 검사합니다. 자동 저장 한도를 넘는 백업을 열면 화면에서 이용할 수 있지만 저장 실패 안내가 계속 표시됩니다. 내보내기·초기화 전에 필요한 기록을 보관해 주세요.

원본 커밋은 `423c7291d09e07ac9c9a48c2a1f743d9fef3e776`이며, 기존 5개 파일을 `legacy/423c729/`에 보존했습니다. 프로젝트 옆의 `NA2-cabling_원본_423c729_20261022.zip`은 Git 원본 아카이브입니다. 루트의 기존 `app.js`, `styles.css`, `manifest.json`도 남겨 두었으며 React 진입점에서는 사용하지 않습니다.

## 파일 구성

```text
src/App.jsx          화면·도해·브라우저 상호작용
src/content.mjs      학습 내용·문항·출처
src/model.mjs        채점·회차·저장 검증·통계
src/styles.css       반응형 시리즈 디자인
tests/               모델 및 백업 크기 회귀검사
docs/                PRD·내용 검수·검증 결과
legacy/423c729/      이전 앱 보존본
```

## 공개 배포 절차

`.github/workflows/verify.yml`은 테스트와 빌드만 수행합니다. `.github/workflows/deploy-pages.yml`은 수동 실행 전용이며 자동 공개하지 않습니다.

현재 Pages의 Source는 GitHub Actions입니다. 이후 업데이트는 승인한 소스를 GitHub에 반영한 다음 `Deploy React to GitHub Pages`를 수동 실행합니다. 완료 후 공개 주소에서 하위 경로·풀이·저장·화면을 다시 확인합니다. 2026-10-22 공개 배포 및 검증 결과는 [배포 기록](docs/DEPLOYMENT.md)에 따로 정리했습니다.
