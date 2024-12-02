const express = require('express');
const router = express.Router();
const boardService = require('../service/board_service.js');

//전체조회
router.get('/boards', (req, res)=>{
    boardService
        .findAll()
        .then(list => {
            res.send(list);
        })
        .catch(err => {
            res.status(500).send('Fail Process');
        })
})

//단건조회
router.get('/boards/:no', async (req, res)=>{
    let boardNo = req.params.no;
    let info = await boardService.findByboardNo(boardNo);
    res.send(info);
})
//라우팅 = 사용자의 요청(URL+METHOD) + Service + view

//등록
router.post('/boards', async (req, res) => {
    let boardInfo = req.body;
    let result = await boardService.createNewBoard(boardInfo);
    res.send(result);
  });

//수정
router.put('/boards/:no', async(req, res)=>{
    let no = req.params.no;
    let info = req.body;
    let result = await boardService.updateBoardInfo(no, info);
    res.send(result);
})

//댓글조회
router.get('/comment/:bno', (req, res)=>{
    let boardNo = req.params.bno;
    boardService
        .findComment(boardNo)
        .then(list => {
            res.send(list);
        })
        .catch(err => {
            res.status(500).send('Fail Process');
        })
})

module.exports = router;