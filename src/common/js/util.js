export function getRedirectPath({type, avatar}) {
  // 根据用户信息，返回跳转地址
  let url = type === 'captain' ? '/captain' : '/sailor'
  if (!avatar) url += 'info'
  return url
}

export const getChatId = (userId, targetId) => {
  return [userId, targetId].sort().join('_')
}