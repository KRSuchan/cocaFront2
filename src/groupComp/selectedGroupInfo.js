// SelectedGroupInfo.js
import React from 'react';
import styles from '../css/GroupPage.module.css';

const selectedGroupInfo = ({ group, onLeave, onJoin, isMember }) => {
  return (
    <div className={styles.selectedGroupInfo}>
      <span className={styles.groupNameTitle}>{group.name}</span>
      <span className={styles.memberCountInfo}>{group.memberCount}명</span>
      <div className={styles.groupInfoBox}>
        <p className={styles.adminName}>[관리자] {group.admin}</p>
      </div>
      <div className={styles.groupInfoBox}>
        <p className={styles.groupDescription}>{group.description}</p>
        <div className={styles.groupHashtags}>
          {group.hashtags.map((hashtag, index) => (
            <span key={index} className={styles.hashtag}>{hashtag}</span>
          ))}
        </div>
      </div>
      {isMember ? (
        <button className={styles.joinButton} onClick={onLeave}>탈퇴</button>
      ) : (
        <button className={styles.joinButton} onClick={onJoin}>참가</button>
      )}
    </div>
  );
};

export default selectedGroupInfo;
