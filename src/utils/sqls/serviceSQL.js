export const getNearestServiceSql = (workId, latitude, longitude) => {
    return `SELECT * FROM addresses AS ad INNER JOIN services AS s ON s.location=ad.id WHERE ST_Within(ST_TRANSFORM(ST_SRID(ad.location, 4326), 3857), ST_Buffer(
        ST_TRANSFORM(
        ST_PointFromText('POINT(${latitude} ${longitude})', 4326)
        , 3857), 15000)) AND workId=${workId};`
}