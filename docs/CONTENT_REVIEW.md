# 케이블링 학습 내용 검수 기록

검토일: 2026-10-22 · 대상 기준: `423c7291d09e07ac9c9a48c2a1f743d9fef3e776`에서 React로 전환한 학습 콘텐츠

## 확인한 사실과 적용 범위

| 항목 | 확인한 사실 | 앱에 적용하는 범위 | 근거 |
|---|---|---|---|
| 핀 배열 | T568A/B는 1·2 및 3·6 위치의 녹색·주황색 쌍이 바뀌며 4·5·7·8은 동일 | 16개 핀과 두 배열의 정답 데이터 | H3C, Appendix C Ethernet twisted pair cable |
| 플러그 방향 | 클립이 관찰자 반대쪽인 기준에서 왼쪽이 1번 | 접점·클립·1~8번을 함께 표시. 잭 방향과 혼용하지 않음 | ICC, position 1 안내 |
| 10/100 송수신 | MDI는 1·2 송신, 3·6 수신이며 MDI-X는 반대 | 속도와 포트 조건을 명시 | H3C Table 9-3, 9-4 |
| 기가비트 | 1000BASE-T는 네 쌍을 양방향 데이터에 사용 | 10/100의 고정 송수신 설명을 확대하지 않음 | H3C Table 9-3, 9-4; HPE Aruba pin-outs |
| 직결 | 양 끝의 같은 번호끼리 연결 | A-A·B-B를 직결로 판정 | Cisco Appendix B, Fluke의 양 끝 동일 wiring code 설명 |
| 두 쌍 교차 | 10BASE-T·100BASE-TX 교차 학습은 1↔3, 2↔6 관계를 다룸 | A-B·B-A 판별과 양 끝 연결 도해 | H3C Figure 9-4, Fluke 10/100 시험 설정 |
| 네 쌍 교차 | 1000BASE-T 교차는 별도 구성·시험 설정으로 구분 | A-B만으로 모든 기가비트 교차를 설명하지 않음 | Cisco Appendix B의 Four Twisted-Pair 도해, Fluke 1000BASE-T Crossover 절 |
| Auto-MDI-X | 기능을 지원하고 활성화한 포트가 필요한 결선 유형을 자동 판단·보정 | `같은 장비면 항상 크로스`와 같은 단정 제거 | Cisco Appendix C |
| 제작 시간·배점 | ICQA 공개 실기 안내 이미지에서 케이블 작업 10분·6.5점 확인 | 10분 제작 연습의 근거. 앱 퀴즈를 공식 점수로 환산하지 않음 | ICQA 공식 FAQ 연결 이미지, 이번 작업의 브라우저 원본 검토에서 확인 |

H3C 문서의 핀 배열·포트 신호 표를 근거로 사용한다. 그 문서의 장비 종류별 예시에는 혼동 소지가 있어 일반적인 장비 이름만으로 정답을 정하는 문항은 만들지 않는다. MDI/MDI-X와 Auto-MDI-X 조건으로 설명한다.

## 독립 확인용 정답 기준

| 핀 | T568A | T568B |
|---:|---|---|
| 1 | 흰색/녹색 | 흰색/주황색 |
| 2 | 녹색 | 주황색 |
| 3 | 흰색/주황색 | 흰색/녹색 |
| 4 | 파란색 | 파란색 |
| 5 | 흰색/파란색 | 흰색/파란색 |
| 6 | 주황색 | 녹색 |
| 7 | 흰색/갈색 | 흰색/갈색 |
| 8 | 갈색 | 갈색 |

두 쌍 교차의 핀 연결 기대값은 왼쪽 1~8번에 대해 오른쪽 `[3, 6, 1, 4, 5, 2, 7, 8]`이다. 직결은 `[1, 2, 3, 4, 5, 6, 7, 8]`이다. 숫자 배열은 양 끝을 같은 관찰 방향으로 놓는다는 조건에서 사용한다.

## 설계 결정

- 22개 템플릿과 혼합 10·핀 8·배열 2·유형 4문제 회차, 무작위 선택지, 연습/평가/오답 복습 구분은 이 앱의 교육 설계이다. 공식 시험 구성을 재현한다고 표시하지 않는다.
- 배열 평가는 8개 위치가 모두 맞아야 정답이다. 부분 정답에 공식 배점을 부여하지 않는다.
- 진행 중인 평가는 제출 후에도 정오·정답·해설·오류 핀 표시를 숨기고 회차 종료 결과에서 공개한다. 같은 회차의 이벤트는 원본 상태와 백업에 보존하되 화면 통계·오답 목록·최근 응답에서만 제외하며, 사이드바 오답 수도 동일하게 처리한다. 회차 종료 후 표시하고, 진행 평가를 새 훈련으로 대체한 경우에도 이미 제출한 기록을 유지하여 화면 집계에 반영한다. 연습과 오답 복습은 제출 직후 설명을 제공한다. 진행 평가의 다른 화면에서 정오를 미리 알아내거나 앞 문항의 피드백을 뒤 문항의 단서로 사용하는 것을 막기 위한 설계이다.
- 최초 평가 정답률은 도움말 없이 평가한 첫 응답의 지표이고, 반복 응답을 포함한 전체 정답률과 구분한다.
- 날짜별 통계는 로컬 달력 날짜를 사용하며, 기준 시각을 30초마다 또는 창 포커스 복귀 시 갱신해 자정 이후의 날짜 변경을 반영한다.
- 다른 탭의 저장 변경을 감지하면 현재 탭 저장을 중단하고 백업·새로고침을 안내한다. 서로 다른 탭에서 만든 기록을 임의로 병합하거나 오래된 상태로 덮어쓰지 않는다.
- 줄무늬·색상명·핀 번호를 함께 사용해 색만으로 내용을 전달하지 않는다.
- 10분 타이머는 실물 제작을 위한 시간 도구이다. 점검표는 사용자가 직접 확인한 결과로 표시한다.
- 출처의 일반 설명을 실제 출제 빈도, 국내 보급률, 합격 가능성으로 확대하지 않는다.

## 미검증 범위와 출처 상태

실제 케이블 압착, 접점 상태, 도통, split pair, 전송 성능은 웹앱에서 측정하지 않았다. 화면에서 배열을 맞춘 것과 테스터 통과를 구분한다. 모든 장치의 Auto-MDI-X 지원·활성화 여부 역시 이 앱에서 확인할 수 없다.

ICC·H3C·Cisco·Fluke·HPE Aruba 원문은 2026-10-22 다시 열어 해당 절을 확인했다. ICQA는 검색 도구의 이미지 읽기가 실패했지만, 이번 작업의 브라우저 원본 검토에서 FAQ가 연결하는 공식 이미지의 10분·6.5점을 확인했다. 향후 시험 안내가 바뀌면 해당 회차의 ICQA 안내를 다시 확인해야 한다. 검토일은 원문 발행일과 다르다.

## 원문 목록

1. [H3C SecPath F5000-AI-20[40] Firewalls Installation Guide-6W102 — Appendix C, Ethernet twisted pair cable](https://www.h3c.com/en/Support/Resource_Center/EN/Security/Catalog/F5000/F5000/Technical_Documents/Install___Upgrade/Installation_Guides/H3C_F5000-AI-20%5B40%5D_IG/202211/1715517_294551_0.htm). URL 경로 2022-11, 본문 별도 일자 확인 안 됨.
2. [ICC — Where is position 1 located on an RJ-45 modular plug and jack?](https://icc.com/help/position-1-located-rj-45-modular-plug-jack/). 본문 발행일 표시 없음.
3. [Cisco — Configure and Verify Ethernet 10/100/1000Mb Half/Full Duplex Auto-Negotiation](https://www.cisco.com/c/en/us/support/docs/lan-switching/ethernet/10561-3.html). 원문 갱신일 2025-11-06, Appendix B·C.
4. [Fluke Networks — Crossover Cable Testing – DSX Cable Analyzer](https://www.flukenetworks.com/knowledge-base/dsx-cableanalyzer-series/crossover-cable-testing-dsx-cable-analyzer). 원문 표시일 2016-11-28.
5. [ICQA 공식 FAQ](https://www.icqa.or.kr/cn/faq?fm_id=2)의 [네트워크관리사 실기 안내 이미지](https://www.icqa.or.kr/cn/data/editor/2507/9c400cf94ec15d6f33d6546a80c7e60f_1751934566_3098.jpg). ICQA 공식 도메인. 이미지 저장 경로만으로 개정일을 단정하지 않음.
6. [Fluke Networks — Differences Between Wiring Codes T568A vs T568B](https://www.flukenetworks.com/knowledge-base/application-or-standards-articles-copper/differences-between-wiring-codes-t568a-vs). 원문 표시일 2014-01-29. 주황·녹색 쌍의 위치 차이와 잭 앞면·뒷면 구분을 확인.
7. [HPE Aruba — Twisted-pair cable/connector pin-outs](https://arubanetworking.hpe.com/techdocs/Switches/Aruba_6200/5200-6885/v34011710.html). 본문 발행일 표시 없음. 1000BASE-T의 네 쌍 사용과 해당 제품의 Auto-MDI-X 동작을 확인.
