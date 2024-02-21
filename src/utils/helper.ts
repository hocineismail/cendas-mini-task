const getFontSize = (priority: number): string => {
  switch (priority) {
    case 1:
      return "20px";
    case 2:
      return "18px";

    case 3:
      return "16px";

    case 4:
      return "14px";

    case 5:
      return "12px";

    case 6:
      return "10px";

    default:
      return "16px";
  }
};

export {
  getFontSize,
}