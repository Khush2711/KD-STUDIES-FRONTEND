export default function GetAvgRating(ratingArr) {
    if (ratingArr?.length === 0) return 0;
    const totalReviewCount = ratingArr?.reduce((acc, curr) => {
        acc += curr.rating
        return acc
    }, 0)

    const multipler = Math.pow(10, 1)
    const avgReviewCount = Math.round((totalReviewCount / ratingArr?.length) * multipler) / multipler;

    return avgReviewCount;
}