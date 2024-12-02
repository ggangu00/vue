const mysql = require('../database/mapper.js');

//전체조회
const findAll = async () => {
  let list = await mysql.query('boardList');
  return list;
};

//단건조회
const findByboardNo = async (boardNo) => {
  let list = await mysql.query('boardInfo', boardNo)
  let info = list[0];
  return info;
};

//등록
const createNewBoard = async (boardInfo) => {

  let result = await mysql.query('boardInsert', boardInfo);
  if (result.insertId > 0) {
    return { no: result.insertId };
  } else {
    return {}; //실패시 빈객체 반환
  }
};

//수정
const updateBoardInfo = async(boardNo, updateInfo) => {
  let data = [updateInfo, boardNo];
  let result = await mysql.query('boardUpdate', data);
  let returnData = {};

  if(result.changedRows >= 1){
    returnData.target = { 'no' : boardNo };
    returnData.result = true;
  }else{
    returnData.result = false;
  }

  return returnData;
};

//댓글조회
const findComment = async (boardNo) => {
  let list = await mysql.query('commentList', boardNo);
  return list;
};

module.exports = {
  findAll,
  findByboardNo,
  createNewBoard,
  updateBoardInfo,
  findComment
};