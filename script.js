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
window.addEventListener("load", () => {
    const section3 = document.querySelector(".section3");

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    section3.classList.add("active");
                    observer.unobserve(section3); // 최초 실행 후 관찰 중지
                }
            });
        },
        { threshold: 0.3 }
    );

    observer.observe(section3);
});
window.addEventListener("load", () => {
    // 로딩 화면 숨기기
    const loading = document.querySelector(".loading-overlay");
    if (loading) loading.style.display = "none";

    const section3 = document.querySelector(".section3");
    const cards = [
        document.querySelector(".card1"),
        document.querySelector(".card2"),
        document.querySelector(".card3"),
        document.querySelector(".card4"),
    ];

    // IntersectionObserver 설정
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // section3 라인 등장
                    section3.classList.add("active");

                    // 카드 순차 등장
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add("show");
                        }, index * 200); // 0.2초 간격
                    });

                    observer.unobserve(section3); // 한 번만 실행
                }
            });
        },
        {
            threshold: 0.3, // 요소가 조금이라도 들어오면 체크
            rootMargin: "-20% 0px 0px 0px", // 화면 상단에서 30% 위쪽에 도달했을 때 발동
        }
    );

    observer.observe(section3);
});
