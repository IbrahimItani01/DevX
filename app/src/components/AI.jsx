  return (
    <>
      <div className="ai-button" onClick={handleClick}>
        <Bug color="black" />
      </div>
      {clicked && (
        <div className="ai-bubble">
          <p onClick={generateResponse}>Analyze Code</p>
          <p onClick={generateResponse}>Fix Errors</p>
        </div>
      )}
    </>
  );
};

export default AI;
