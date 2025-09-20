import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, inquiry } = body ?? {};

    if (!name || !email || !inquiry) {
      return NextResponse.json(
        {
          code: 400,
          msg: '请完整填写必填信息后再提交。'
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      code: 200,
      msg: '提交成功'
    });
  } catch (error) {
    return NextResponse.json(
      {
        code: 500,
        msg: '请求处理失败，请稍后重试。'
      },
      { status: 500 }
    );
  }
}
