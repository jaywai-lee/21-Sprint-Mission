/**
 * IntersectionObserver API를 이용해 특정 요소가 화면에 보일 때 전달받은 콜백 함수를 실행해주는 custom hooks 입니다.
 * IntersectionObserver는 브라우저에서 제공하는 API로 특정 DOM 요소가 화면에 들어왔는지를 감지하여, scroll event처럼 계속 계산하지 않고 브라우저가 최적화된 방식으로 처리합니다.
 * 이 훅은 ref를 하나 만들어서 반환하고, 해당 ref가 연결된 DOM 요소를 관찰하다가 요소가 화면에 보이면 onIntersect 콜백을 실행합니다.
 * enalbed, loading 상태에 따라 자동으로 관찰을 중단하거나 재개합니다.
 * -------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * @param {Object} options
 *
 * @param {Function} options.onIntersect
 *        - 관찰 대상이 화면에 들어왔을 때 실행할 함수
 * @param {boolean} [options.enabled=true]
 *        - true: observer 활성화
 *        - false: observer 비활성화 (더 이상 불러올 데이터가 없을 때)
 * @param {boolean} [options.loading=false]
 *        - true: 현재 데이터 요청 중, 중복 요청 방지를 위해 loading 중에는 실행 X
 * @param {number} [options.threshold=1]
 *        - 0 ~ 1 사이의 값, 1이면 요소가 100% 화면에 들어왔을 때 실행
 * @param {Element|null} [options.root=null]
 *        - 관찰 기준이 되는 부모 요소, 기본값(null)은 viewport
 * @param {string} [options.rootMargin='0px']
 *        - 관찰 범위를 확장/축소
 *        - ex) '200px' -> 화면에 닿기 전에 미리 로딩
 * @returns {React.RefObject}
 *        - 관찰 대상 DOM 요소에 연결할 ref
 */

import { useEffect, useRef } from 'react';

function useInfiniteScroll({
  onIntersect,
  enabled = true,
  loading = false,
  threshold = 1,
  root = null,
  rootMargin = '0px',
}) {
  const targetRef = useRef(null);

  useEffect(() => {
    if (!enabled || loading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      {
        threshold,
        root,
        rootMargin,
      },
    );

    const target = targetRef.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) observer.unobserve(target);
      observer.disconnect();
    };
  }, [onIntersect, enabled, loading, threshold, root, rootMargin]);

  return targetRef;
}

export default useInfiniteScroll;
