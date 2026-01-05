import { useNavigate, useParams } from "react-router-dom";
import styles from "./ProductDetail.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchProductById } from "../api/productAPI";
import {
  deleteComment,
  fetchProductComments,
  updateComment,
} from "../api/commentAPI";
import Nav from "../components/layout/Nav";
import back from "../assets/back.png";
import ProductDetailHeader from "../components/product/ProductDetailHeader";
import CommentForm from "../components/comment/CommentForm";
import CommentEmpty from "../components/comment/CommentEmpty";
import CommentList from "../components/comment/CommentList";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasNext, setHasNext] = useState(true);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState(null);
  const navigate = useNavigate();
  const lastCursorRef = useRef(null);
  const didInitLoadRef = useRef(false);

  useEffect(() => {
    let mounted = true;
    async function loadProduct() {
      try {
        setIsLoading(true);
        const data = await fetchProductById(productId);
        if (mounted) setProduct(data);
      } catch (err) {
        if (mounted) setError(err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }
    loadProduct();
    return () => {
      mounted = false;
    };
  }, [productId]);

  const loadMoreComments = useCallback(async () => {
    if (isCommentsLoading || !hasNext) return;
    if (cursor !== null && lastCursorRef.current === cursor) return;
    lastCursorRef.current = cursor;
    try {
      setIsCommentsLoading(true);
      const data = await fetchProductComments(productId, {
        cursor,
        limit: 10,
      });
      setComments((prev) => [...prev, ...data.list]);
      setCursor(data.nextCursor);
      setHasNext(Boolean(data.nextCursor));
    } catch (err) {
      console.error(err);
    } finally {
      setIsCommentsLoading(false);
    }
  }, [productId, cursor, hasNext, isCommentsLoading]);

  useEffect(() => {
    if (didInitLoadRef.current) return;
    didInitLoadRef.current = true;
    loadMoreComments();
  }, []);

  const handleGoToMain = () => {
    navigate("/items");
  };

  const handleLike = () => {
    //좋아요 기능 추후 개발해보기
  };

  const handleEditSubmit = async (commentId, content) => {
    await updateComment(commentId, content);
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, content } : c))
    );
  };

  const handleDelete = async (commentId) => {
    await deleteComment(commentId);
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  };

  if (isLoading) return <p>로딩중 ...</p>;
  if (error) return <p>에러 발생</p>;
  return (
    <>
      <Nav />
      <div className={styles.productPage}>
        <ProductDetailHeader product={product} onLike={handleLike} />
        <CommentForm />
        {commentsError && <p>댓글을 불러오지 못했습니다.</p>}
        {!isCommentsLoading && comments.length === 0 && <CommentEmpty />}
        <CommentList
          comments={comments}
          onEditSubmit={handleEditSubmit}
          onDelete={handleDelete}
        />
        {hasNext && (
          <div className={styles.loadMoreWrapper}>
            <button
              onClick={loadMoreComments}
              disabled={isCommentsLoading}
              className={styles.loadMoreButton}
            >
              {isCommentsLoading ? "불러오는 중..." : "댓글 더보기"}
            </button>
          </div>
        )}
        {isCommentsLoading && <p>댓글 불러오는 중...</p>}
        <div className={styles.homeButtonWrapper}>
          <button onClick={handleGoToMain} className={styles.homeButton}>
            목록으로 돌아가기
            <img className={styles.back} src={back} />
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
