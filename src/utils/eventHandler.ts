import type React from "react";

export const handleOverlayClick = (
  e: React.MouseEvent,
  onClose: () => void
) => {
  if (e.target === e.currentTarget) {
    onClose();
  }
};
