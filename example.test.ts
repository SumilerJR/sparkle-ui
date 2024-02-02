// import { test, describe, vi, expect, Mocked } from 'vitest';
// import { testFn, request } from './utils';
// import axios from 'axios';

// // 将 axios 模块mock化
// vi.mock('axios');
// const mockedAxios = axios as Mocked<typeof axios>;

// // 回调函数测试
// describe('functions', () => {
//     test('create a mock function', () => {
//         // 创建一个 mock 函数
//         const callback = vi.fn();
//         // 调用测试函数并传入参数
//         testFn(12, callback);
//         // 断言回调函数被调用过
//         expect(callback).toHaveBeenCalled();
//         // 断言回调函数被正确调用
//         expect(callback).toHaveBeenCalledWith(12);
//     });

//     // 方法间谍测试
//     test('spy on method', () => {
//         // 创建一个包含 getName 方法的对象
//         const obj = {
//             getName: () => 1
//         };
//         // 间谍监视对象的 getName 方法
//         const spy = vi.spyOn(obj, 'getName');
//         // 调用对象的 getName 方法
//         obj.getName();
//         // 断言间谍被调用过
//         expect(spy).toHaveBeenCalled();
//         // 再次调用对象的 getName 方法
//         obj.getName();
//         // 断言间谍被调用了两次
//         expect(spy).toHaveBeenCalledTimes(2);
//     });

//     // 第三方模块mock测试
//     test('mock third party module', async () => {
//         // 使用 mockedAxios 模拟 GET 请求并返回指定数据
//         mockedAxios.get.mockResolvedValue({ data: 123 });
//         // 发送请求并等待结果
//         const result = await request();
//         // 断言请求返回的数据为 123
//         expect(result).toBe(123);
//     });
// });
