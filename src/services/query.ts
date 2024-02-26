const DEFAULT_PAGE_LIMIT=10;
const DEFAULT_PAGE_NUMBER=1;
export function getPagination(query){
  const page = parseInt(query.current_page) || DEFAULT_PAGE_NUMBER;
  const limit = parseInt(query.per_page) || DEFAULT_PAGE_LIMIT;
  const skip=(page - 1)*limit;
  return{
    skip,
    limit,
    page
  };
}
