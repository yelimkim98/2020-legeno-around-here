DELETE
FROM NOTIFICATION
WHERE RECEIVER_ID <> 9
  AND RECEIVER_ID <> 10;
DELETE
FROM POST_ZZANG;
DELETE
FROM POST_IMAGE;
DELETE
FROM COMMENT_ZZANG;
DELETE
FROM POST_REPORT_POST_IMAGE_URLS;
DELETE
FROM POST_REPORT;
DELETE
FROM COMMENT_REPORT;
DELETE
FROM USER_REPORT;
DELETE
FROM COMMENT;
DELETE
FROM POST;
ALTER TABLE POST
    ALTER COLUMN id RESTART WITH 1;
DELETE
FROM SECTOR_CREATOR_AWARD;
DELETE
FROM SECTOR;
DELETE
FROM USER_IMAGE;
DELETE
FROM USER_ROLES
WHERE USER_ID > 11;
DELETE
FROM USER
WHERE ID > 11;
