## 이미지 퍼즐 게임

### 실행 화면

| 초기 화면 | 5초 후 카드 셔플 | Completed |
|:--------|:--------:|:--------:|
| ![초기 화면](https://user-images.githubusercontent.com/54324782/150049077-e141dd0c-45e4-4a13-958d-ca113a4969c9.png) | ![셔플](https://user-images.githubusercontent.com/54324782/150049125-9bfc30a6-ecc3-472f-9795-b19421cd7a0e.png) | ![Completed](https://user-images.githubusercontent.com/54324782/150049262-670ea3cd-a8db-4249-b230-5cb47d401c15.png)

### 시스템 주요 기능

- 게임시작 (타일 배치)
- 16크기의 배열 생성 후 li 태그 정의
- 타일 랜덤 셔플
- 드래그, 드래그 오버, 드롭 이벤트
- 전체 타일 상태 체크 (타일이 모두 일치했는지)
- 소요된 시간(초 단위)

### 추가

- index.html 파일에 main.js 스크립트를 선언할 때
> DOM을 관리할 때 Script가 먼저 로딩되고 렌더링되어 작동을 하지 않을 수도 있기 때문에 body 태그 안에서 제일 하단에 작성해준다.
