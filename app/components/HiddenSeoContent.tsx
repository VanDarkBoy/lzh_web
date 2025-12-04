const HiddenSeoContent = () => {
    return (
        <div className="sr-only">
            <article itemScope itemType="https://schema.org/Product">
                <h1 itemProp="name">E2COOL 固态锂电池 4000mAh 模组</h1>
                <p itemProp="description">
                    一款适用于储能与智能出行的高密度锂电池模组，循环寿命超过 2000 次。
                </p>
                <ul>
                    <li>容量：4000mAh</li>
                    <li>电压：3.7V</li>
                    <li>循环寿命：2000 次</li>
                    <li>执行标准：GB/T 31484-2015</li>
                </ul>
                <section itemScope itemType="https://schema.org/Review">
                    <h2 itemProp="name">用户评价</h2>
                    <p itemProp="reviewBody">运行稳定，充放效率高，非常适合小型储能项目。</p>
                </section>
            </article>
        </div>
    );
};

export default HiddenSeoContent;
