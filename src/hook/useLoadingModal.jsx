import React, { useState } from "react";
import { Spinner } from "react-bootstrap";

const LoadingModal = ({ loading }) => (
  loading ? (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent backdrop
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000, // Ensures it appears above other elements
      }}
    >
      <Spinner animation="border" />
    </div>
  ) : null
);

const useLoadingModal = () => {
  const [loading, setLoading] = useState(false);

  const showLoading = () => {
    setLoading(true);
  };

  const hideLoading = () => {
    setLoading(false);
  };

  return { showLoading, hideLoading, loading };
};

export { useLoadingModal, LoadingModal };
