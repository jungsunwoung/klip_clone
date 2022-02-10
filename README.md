# Klip clone coding
=============
1. Start
'''
npm run dev
'''
* react server : localhost:3000
* jsonServer : localhost:8080

2. Test
'''
npm run test
'''
cypress, jest (테스트 코드는 작성 안함)

3. Features
* Kakao Login : 첫 화면에서 카카오 로그인 후 닉네임 정보 받아와 화면에 띄워줌
* Hamburger : styled.div로 css 따로 구현
* Banner : styled.di로 css 및 settimeout으로 일정 시간 자동으로 넘어가게 설정. 
* JsonServer : 
  - db.json을 통해 데이터를 가지고옴
  - routes.json을 통해 wallet/token 등 설정
  - public 폴더에 card 용 json 설정. 
* Card : 최근 전송 친구, 카드는 좌우 스크롤 가능

4. Point to Fix
* Inline Css 
  - 작은 프로젝트라 생각해서 inline으로 코드를 작성했는데 css파일을 따로 뺴서 하는게 깔끔했을 것 같다
  - 중복되는 코드가 많은데 이를 정리하지 못했다
* Test
  - 테스트 코드 작성에 익숙하지 않아 jest와 cypress를 제대로 사용하지 못했다. 
  - 선 Test 후 코드반영을 연습해야겠다
* Design
  - 디자인 요소는 일치하지 않아도 된다고 했지만 몇몇 마음에 걸리는 부분을 수정하지 못했다
