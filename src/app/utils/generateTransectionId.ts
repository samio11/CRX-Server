export const generateTransectionId = async () => {
  return `CRX_${Date.now()}_${Math.floor(10000 + Math.random() * 90000)}`;
};
