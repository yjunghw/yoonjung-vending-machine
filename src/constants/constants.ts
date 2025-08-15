import type { Beverage } from "../types/display";

// 1. 사용자가 사용가능한 결제수단
//     1. 현금 : 100원 / 500원 / 1,000원 / 5,000원 / 10,000원권 사용가능
//     2. 카드 : 카드결제 가능
// 2. 구매 가능한 음료수
//     1. 콜라 : 1,100원
//     2. 물 : 600원
//     3. 커피 : 700원
// 3. 발생 가능한 상황에 대한 로직과 프로세스 반영

// 📌 예외 케이스 고려
// 거스름돈 부족 시 처리 방식
// 결제 중 취소
// 카드 결제 실패
// 금액 입력 오류
// 품절 상태
// 동일 음료 연속 구매

export const CASH_UNITS = [100, 500, 1000, 5000, 10000];

export const BEVERAGE_LIST: Beverage[] = [
  { name: "콜라", price: 1100 },
  { name: "물", price: 600 },
  { name: "커피", price: 700 },
];

export const CARD_LIMIT = 9999999;
