const InputSection = ({ userInput, setUserInput }) => {
  return (
    <div className="input">
      <p>Input</p>
      <textarea
        placeholder="Enter your input here..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className="user-input"
      />
    </div>
  );
};

export default InputSection;
