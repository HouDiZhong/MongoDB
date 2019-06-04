/*
 * @Author: zx·H
 * @Date: 2019-05-27 11:01:32
 * @LastEditors: zx·H
 * @LastEditTime: 2019-06-03 10:14:06
 * @Description: mongo 运行脚本
 * @run 1. 在非mongo状态下： mongo index.js   2.在mongo状态下  load('./index')
 */

let command = {
    // 要操作的集合
    findAndModify: 'students',
    // 查询条件，制定范围
    query: {name: 'zx'},
    // 指定如何更新
    update: {$set: {age: 24}},
    // 指定返回的字段 0 || false 为不返回数据
    fields: {age: 1, _id: 0},
    // 是否排序  按照age字段正序排列
    sort: {age : 1},
    // true，返回更新后的文档； false返回更新前的文档
    new: true
};

let db = connect('school');
let result = db.runCommand(command);

printjson(result);
