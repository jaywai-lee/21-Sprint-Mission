import styles from "./CommentList.module.css";
import kebab from "../../assets/kebab.png";
import user from "../../assets/user.png";
import { formatDate } from "../../utils/formatDate";
import { useEffect, useRef, useState } from "react";

function CommentList({ comments, onEditSubmit, onDelete }) {
  const [openCommentId, setOpenCommentId] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const dropdownRef = useRef(null);

  const toggleDropdown = (commentId) => {
    setOpenCommentId((prev) => (prev === commentId ? null : commentId));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenCommentId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEditStart = (comment) => {
    setEditingCommentId(comment.id);
    setEditValue(comment.content);
    setOpenCommentId(null);
  };

  const handleEditCancel = () => {
    setEditingCommentId(null);
    setEditValue("");
  };

  const handleEditSubmitClick = (commentId) => {
    onEditSubmit(commentId, editValue);
    setEditingCommentId(null);
    setEditValue("");
  };

  return (
    <div className={styles.commentBox}>
      {comments.map((comment) => {
        const isEditing = editingCommentId === comment.id;

        return (
          <div key={comment.id} className={styles.commentItem}>
            <div className={styles.commentWrapper}>
              {isEditing ? (
                <div className={styles.editBox}>
                  <textarea
                    className={styles.editInput}
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <div className={styles.editFooter}>
                    <div className={styles.commentUser}>
                      <img src={comment.writer.image || user} alt="user" />
                      <div className={styles.commentUserInfo}>
                        <p className={styles.commentUserName}>
                          {comment.writer.nickname}
                        </p>
                        <p className={styles.commentUserDate}>
                          {formatDate(comment.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className={styles.editActions}>
                      <button
                        type="button"
                        className={styles.cancel}
                        onClick={handleEditCancel}
                      >
                        취소
                      </button>
                      <button
                        type="button"
                        className={styles.submit}
                        onClick={() => handleEditSubmitClick(comment.id)}
                      >
                        수정 완료
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <p className={styles.comment}>{comment.content}</p>
                  <button
                    className={styles.kebab}
                    type="button"
                    onClick={() => toggleDropdown(comment.id)}
                  >
                    <img src={kebab} alt="kebab" />
                  </button>
                </>
              )}

              {openCommentId === comment.id && (
                <div ref={dropdownRef} className={styles.dropdown}>
                  <button
                    type="button"
                    onClick={() => handleEditStart(comment)}
                  >
                    수정하기
                  </button>
                  <button type="button" onClick={() => onDelete(comment.id)}>
                    삭제하기
                  </button>
                </div>
              )}
            </div>

            {!isEditing && (
              <div className={styles.commentUser}>
                <img src={comment.writer.image || user} alt="user" />
                <div className={styles.commentUserInfo}>
                  <p className={styles.commentUserName}>
                    {comment.writer.nickname}
                  </p>
                  <p className={styles.commentUserDate}>
                    {formatDate(comment.createdAt)}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default CommentList;
