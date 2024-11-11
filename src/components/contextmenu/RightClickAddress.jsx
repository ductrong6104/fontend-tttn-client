export const RightClickAddress = ({ lat, lon, onSaveAddress }) => {
    return (
      <div
        style={{
          position: "absolute",
          top: `${lat}px`,
          left: `${lon}px`,
          backgroundColor: "white",
          border: "1px solid black",
          padding: "10px",
          zIndex: 1000,
        }}
      >
        <button onClick={onSaveAddress}>Lưu địa chỉ</button>
      </div>
    );
  };