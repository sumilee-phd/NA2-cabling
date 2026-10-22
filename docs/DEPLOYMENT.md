# 공개 배포 및 기능 검증

확인일: 2026-10-22. 사용자의 명시적인 GitHub 반영·공개 배포 요청에 따라 실행했다.

## 배포 증거

| 항목 | 결과 |
|---|---|
| 공개 주소 | https://sumilee-phd.github.io/NA2-cabling/ |
| 저장소 | https://github.com/sumilee-phd/NA2-cabling |
| 배포 소스 | `cfcacc12b123248389c2bb91402b6e6c3e14f365` |
| main 반영 | 원본 `423c729`에서 배포 소스까지 fast-forward, 강제 덮어쓰기 없음 |
| Pages 방식 | 기존 main 루트 배포에서 GitHub Actions 빌드 산출물 배포로 전환 |
| 독립 CI | [Verify React app #39718637255](https://github.com/sumilee-phd/NA2-cabling/actions/runs/39718637255), success |
| 공개 배포 | [Deploy React to GitHub Pages #39718636073](https://github.com/sumilee-phd/NA2-cabling/actions/runs/39718636073), build·deploy 모두 success |
| 실행 환경 | GitHub Actions Ubuntu, Node.js 22, npm ci·27개 테스트·Vite 빌드 통과 |
| 공개 응답 | HTML·JavaScript·CSS 모두 HTTP 200, Pages 상태 built |

원본 ZIP과 `legacy/423c729/` 보존본은 그대로 유지했다. 후속 문서 커밋은 아래 검증 결과를 기록하기 위한 것이며 배포된 앱 코드와 자산을 변경하지 않는다.

## 공개 자산 대조

| 자산 | 크기 | SHA-256 | 로컬 검증 빌드와 비교 |
|---|---:|---|---|
| `/NA2-cabling/assets/index-Cg9Em04Q.js` | 284244 bytes | `69780D79B28C3D49106824D2EA6F0C2A8B5DDC3FD8DF2DB6663797184DF43923` | 일치 |
| `/NA2-cabling/assets/index-D3iuQiBR.css` | 16595 bytes | `645F6D127B82763E06392A95008F860D141949E55745B0C22661046FE140E2C9` | 일치 |

## 공개 브라우저 조작 결과

Windows의 앱 내 브라우저에서 공개 HTTPS 주소를 직접 열어 검증했다. 로컬 미리보기 결과를 공개 검증으로 대신하지 않았다.

| 순서 | 실제 조작 | 확인 결과 |
|---:|---|---|
| 1 | 공개 대시보드 열기 | React 앱, 제출 0건·학습 0일·정답률 `—` |
| 2 | 유형 판별 평가 4문항 시작 | 평가 중 힌트·해설 및 현재 평가 통계 숨김 |
| 3 | B-A 문항에 직결을 선택하고 제출 버튼 더블클릭 | 답안 1회 제출, 1/4 문항 유지, 답안 변경 불가 |
| 4 | 제출 직후 새로고침 후 이어 풀기 | B-A 문항·직결 응답·제출 잠금·평가 모드 복원 |
| 5 | A-A 직결, A-B 크로스, B-B 직결 제출 | 회차 종료 후 3/4 정답·75%, B-A 오답 1개 |
| 6 | 새로고침 후 학습 기록 열기 | 제출 4건·전체 75%·평가 첫 응답 75%·학습 1일 유지 |
| 7 | 최근 7일 확인 | 10/22에만 4건, 앞선 6일은 0건 |
| 8 | B-A 오답을 크로스로 복습 | 복습 1/1 정답, 오답 목록에서 해제, 과거 오답 이벤트 유지 |
| 9 | 다시 새로고침 후 학습 기록 열기 | 제출 5건·전체 80%·평가 첫 응답 75%·학습 1일 유지 |
| 10 | 브라우저 오류 로그 확인 | 수집된 error·warn 없음 |

기록 5건은 검증에 사용한 브라우저의 로컬 저장소에만 남는다. 서버의 공용 학습 데이터가 아니며 다른 방문자의 기록에 영향을 주지 않는다. 기존 저장소를 초기화하거나 삭제하지 않았다.

스크린샷은 로컬 작업 사본의 `verification/screenshots/09-live-assessment-result.png`, `10-live-persisted-statistics.png`, `11-live-review-persistence.png`에 보관했다. 스크린샷은 Git에서 제외하며 결과와 수치는 이 문서에 기록한다.

## 범위

이번 공개 검증은 배포 상태·자산 일치와 채점·통계·기록 지속성 확인이다. 실제 휴대전화 기종별 조작, 실물 케이블의 압착·도통·전송 품질은 검증하지 않았다. 브라우저의 데이터를 삭제하거나 다른 기기를 사용하면 기록이 자동 동기화되지 않는다.
