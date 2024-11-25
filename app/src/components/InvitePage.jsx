  return (
    <div className="invite-page">
      <div className="invite-title">
        <img src={logo} width={60} alt=""></img>
        <h1>{!decide ? "Hello Developer!" : "See Ya !"}</h1>
      </div>
      {!decide && (
        <>
          <p>
            You are invited to file {fileId} as: {privilege}
          </p>
          <div className="invite-buttons">
            <Button text={"Accept Invite"} onClick={handleAcceptInvite} />
            <Button text={"Decline Invite"} onClick={handleDecline} />
          </div>
        </>
      )}
    </div>
  );
};
