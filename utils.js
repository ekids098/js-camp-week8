// ========================================
// 工具函式
// ========================================

const dayjs = require('dayjs');

/**
 * 計算產品折扣率
 * @param {Object} product - 產品物件
 * @returns {string} - 例如 '8折'
 */
function getDiscountRate(product) {
  // 請實作此函式
  const {origin_price, price} = product;
  const discountRate = Math.round((price / origin_price) * 10);
  if (price === origin_price) return `原價`;
  return `${discountRate}折`;
}

/**
 * 取得所有產品分類（不重複）
 * @param {Array} products - 產品陣列
 * @returns {Array} - 分類陣列
 */
function getAllCategories(products) {
  // 請實作此函式
  return [...new Set(products.map(product => product.category))];
}

/**
 * 格式化日期
 * @param {number} timestamp - Unix timestamp
 * @returns {string} - 格式 'YYYY/MM/DD HH:mm'，例如 '2024/01/01 08:00'
 */
function formatDate(timestamp) {
  // 請實作此函式
  // 提示：dayjs.unix...
  return dayjs.unix(timestamp).format('YYYY/MM/DD HH:mm');
}

/**
 * 計算距今天數
 * @param {number} timestamp - Unix timestamp
 * @returns {string} - 例如 '3 天前'
 */
function getDaysAgo(timestamp) {
  // 請實作此函式
  // 提示：
  // 1. 用 dayjs() 取得今天
  // 2. 用 dayjs.unix(timestamp) 取得日期
  // 3. 用 .diff() 計算天數差異
  const diffDays = dayjs().diff(dayjs.unix(timestamp), 'day');
  if (diffDays === 0) return '今天';
  return diffDays > 0 ? `${diffDays} 天前` : `${Math.abs(diffDays)} 天後`;
}

/**
 * 驗證訂單使用者資料
 * @param {Object} data - 使用者資料
 * @returns {Object} - { isValid: boolean, errors: string[] }
 * 
 * 驗證規則：
 * - name: 不可為空
 * - tel: 必須是 09 開頭的 10 位數字
 * - email: 必須包含 @ 符號
 * - address: 不可為空
 * - payment: 必須是 'ATM', 'Credit Card', 'Apple Pay' 其中之一
 */
function validateOrderUser(data) {
  // 請實作此函式
  const {name, tel, email, address, payment} = data;
  const errors = [];

  if (name === '') errors.push('姓名為空');
  
  const regex = /^09\d{8}$/;
  if (!regex.test(tel)) errors.push('電話格式不正確');

  if (!email.includes('@')) errors.push('Email 無 @');

  if (address === '') errors.push('地址為空');

  const payments = ['ATM', 'Credit Card', 'Apple Pay'];
  if (!payments.includes(payment)) errors.push('付款方式不在允許清單');
  
  return {isValid: errors.length === 0, errors};
}

/**
 * 驗證購物車數量
 * @param {number} quantity - 數量
 * @returns {Object} - { isValid: boolean, error?: string }
 * 
 * 驗證規則：
 * - 必須是正整數
 * - 不可小於 1
 * - 不可大於 99
 */
function validateCartQuantity(quantity) {
  // 請實作此函式
  if (!Number.isInteger(quantity)) return {isValid: false, error: '數量不是正整數'};
  if (quantity < 1) return {isValid: false, error: '數量小於 1'};
  if (quantity > 99) return {isValid: false, error: '數量大於 99'};
  return {isValid: true};
}

/**
 * 格式化金額
 * @param {number} amount - 金額
 * @returns {string} - 格式化後的金額
 * 
 * 格式化規則：
 * - 加上 "NT$ " 前綴
 * - 數字需要千分位逗號分隔（例如：1000 → 1,000）
 * - 使用台灣格式（zh-TW）
 * 
 * 範例：
 * formatCurrency(1000) → "NT$ 1,000"
 * formatCurrency(1234567) → "NT$ 1,234,567"
 * 
 */
function formatCurrency(amount) {
  // 請實作此函式
  return `NT$ ${amount.toLocaleString('zh-tw')}`;
}

module.exports = {
  getDiscountRate,
  getAllCategories,
  formatDate,
  getDaysAgo,
  validateOrderUser,
  validateCartQuantity,
  formatCurrency
};
