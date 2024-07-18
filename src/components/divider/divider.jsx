
export default function Divider({ className, width = '100%', height = '1px', color = '#333' }) {
    return (
      <hr
        className={`${className}`}
        style={{
          width: width,
          height: height,
          backgroundColor: color,
          border: 'none',
          margin: '20px 0'
        }}
      />
    );
  }