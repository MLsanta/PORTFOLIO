window.addEventListener("load", () => {
    document.querySelector(".loading-overlay").style.display = "none";
});
// script.js

// 현재 스크롤 중인지 체크
let isScrolling = false;

window.addEventListener("wheel", (e) => {
    if (isScrolling) return; // 이미 스크롤 중이면 무시

    isScrolling = true;

    // 스크롤 방향 확인
    const direction = e.deltaY > 0 ? 1 : -1;

    // 현재 스크롤 위치
    const currentScroll = window.scrollY;

    // 화면 높이
    const pageHeight = window.innerHeight;

    // 다음 스크롤 위치 계산
    let targetScroll = currentScroll + pageHeight * direction;

    // 범위 제한 (0 ~ 문서 전체 높이)
    const maxScroll = document.body.scrollHeight - pageHeight;
    if (targetScroll < 0) targetScroll = 0;
    if (targetScroll > maxScroll) targetScroll = maxScroll;

    // 부드럽게 스크롤
    window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
    });

    // 애니메이션 끝난 후 스크롤 재활성화
    setTimeout(() => {
        isScrolling = false;
    }, 700); // 화면 전환 시간(ms), 필요에 따라 조절
});
// 대상 카드
const cards = [
    document.querySelector(".imgCard1"),
    document.querySelector(".imgCard2"),
    document.querySelector(".imgCard3"),
    document.querySelector(".imgCard4"),
];

// 스크롤 이벤트
window.addEventListener("scroll", () => {
    const triggerBottom = window.innerHeight * 0.8; // 뷰포트 높이의 80% 지점

    cards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;

        if (cardTop < triggerBottom) {
            setTimeout(() => {
                if (index % 2 === 0) {
                    card.classList.add("showLeft"); // imgCard1,3
                } else {
                    card.classList.add("showRight"); // imgCard2,4
                }
            }, index * 200); // 0.2초 딜레이
        }
    });
});
