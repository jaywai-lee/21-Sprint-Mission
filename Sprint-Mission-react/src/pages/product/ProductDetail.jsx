import { useNavigate, useParams } from "react-router-dom";
import styles from "./ProductDetail.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchProductById } from "../../api/productAPI";
import {
  deleteComment,
  fetchProductComments,
  updateComment,
} from "../../api/commentAPI";
import Nav from "../../components/layout/Nav";
import back from "../../assets/back.png";
import ProductDetailHeader from "../../components/product/ProductDetailHeader";
import CommentForm from "../../components/comment/CommentForm";
import CommentEmpty from "../../components/comment/CommentEmpty";
import CommentList from "../../components/comment/CommentList";

function ProductDetail() {
  const { productId } = useParams();
  const [productState, setProductState] = useState({
    data: null,
    isLoading: true,
    error: null,
  });
  const [commentsState, setCommentsState] = useState({
    list: [],
    cursor: null,
    hasNext: true,
    isLoading: false,
    error: null,
  });
  const navigate = useNavigate();
  const lastCursorRef = useRef(null);
  const didInitLoadRef = useRef(false);

  useEffect(() => {
    let mounted = true;
    async function loadProduct() {
      try {
        setProductState((prev) => ({ ...prev, isLoading: true, error: null }));
        const data = await fetchProductById(productId);
        if (mounted) {
          setProductState({ data, isLoading: false, error: null });
        }
      } catch (err) {
        if (mounted) {
          setProductState((prev) => ({
            ...prev,
            isLoading: false,
            error: err,
          }));
        }
      }
    }
    loadProduct();
    return () => {
      mounted = false;
    };
  }, [productId]);

  const loadMoreComments = useCallback(async () => {
    if (commentsState.isLoading || !commentsState.hasNext) return;
    if (
      commentsState.cursor !== null &&
      lastCursorRef.current === commentsState.cursor
    )
      return;
    lastCursorRef.current = commentsState.cursor;
    try {
      setCommentsState((prev) => ({ ...prev, isLoading: true, error: null }));
      const data = await fetchProductComments(productId, {
        cursor: commentsState.cursor,
        limit: 10,
      });
      setCommentsState((prev) => ({
        ...prev,
        list: [...prev.list, ...data.list],
        cursor: data.nextCursor,
        hasNext: Boolean(data.nextCursor),
        isLoading: false,
      }));
    } catch (err) {
      setCommentsState((prev) => ({ ...prev, isLoading: false, error: err }));
    }
  }, [productId, commentsState]);

  useEffect(() => {
    if (didInitLoadRef.current) return;
    didInitLoadRef.current = true;
    loadMoreComments();
  }, [loadMoreComments]);

  const handleGoToMain = () => {
    navigate("/items");
  };

  const handleLike = () => {
    //좋아요 기능 추후 개발해보기
  };

  const handleEditSubmit = async (commentId, content) => {
    await updateComment(commentId, content);
    setCommentsState((prev) => ({
      ...prev,
      list: prev.list.map((c) => (c.id === commentId ? { ...c, content } : c)),
    }));
  };

  const handleDelete = async (commentId) => {
    await deleteComment(commentId);
    setCommentsState((prev) => ({
      ...prev,
      list: prev.list.filter((c) => c.id !== commentId),
    }));
  };

  if (productState.isLoading) return <p>로딩중 ...</p>;
  if (productState.error) return <p>에러 발생</p>;
  return (
    <>
      <Nav />
      <div className={styles.productPage}>
        <ProductDetailHeader product={productState.data} onLike={handleLike} />
        <CommentForm />
        {commentsState.error && <p>댓글을 불러오지 못했습니다.</p>}
        {!commentsState.isLoading && commentsState.list.length === 0 && (
          <CommentEmpty />
        )}
        <CommentList
          comments={commentsState.list}
          onEditSubmit={handleEditSubmit}
          onDelete={handleDelete}
        />
        {commentsState.hasNext && (
          <div className={styles.loadMoreWrapper}>
            <button
              onClick={loadMoreComments}
              disabled={commentsState.isLoading}
              className={styles.loadMoreButton}
            >
              {commentsState.isLoading ? "불러오는 중..." : "댓글 더보기"}
            </button>
          </div>
        )}
        {commentsState.isLoading && <p>댓글 불러오는 중...</p>}
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
