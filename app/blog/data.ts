import type {BlogDetail, BlogListItem} from './types';

export const blogPosts: BlogDetail[] = [
    {
        id: 'lithium-energy-trends',
        title: '储能行业趋势：从家庭到工商业的全面升级',
        image: 'https://lithiumvalley.com/images/20241104_014017_ca9ef9e2e6ca.jpg',
        pushDate: '2024-10-12',
        description: '锂电池储能如何覆盖家庭、商业与工业场景，并在安全性与智能化上持续突破。',
        content: `
            <p>随着全球能源结构的转型，分布式储能正在从家庭走向工商业，锂电池的高安全性与模块化优势正成为核心竞争力。</p>
            <p>在住宅场景中，用户更加关注<em>安全冗余</em>与<em>智能调度</em>。通过 BMS 与 EMS 的协同，系统能够根据电价与负荷自动切换充放电策略，实现全天候的能源优化。</p>
            <h3>工商业侧的关键看点</h3>
            <ul>
                <li>需求侧响应：配合峰谷电价与柔性负荷，实现能源成本最小化。</li>
                <li>多站融合：储能、光伏、充电桩协同，推动微网场景的灵活配置。</li>
                <li>生命周期管理：通过远程监控与数据闭环，降低 O&M 成本并提升可用性。</li>
            </ul>
            <p>未来的储能产品将更强调软硬件一体化的安全体系，以及符合本地法规的认证。选择具备全球案例与合规能力的供应商，是项目落地的关键。</p>
        `,
    },
    {
        id: 'battery-safety-design',
        title: '高安全储能系统设计的三大要点',
        image: 'https://lithiumvalley.com/images/20241104_013800_1e56227bf6d8.jpg',
        pushDate: '2024-09-18',
        description: '从电芯到系统级防护，如何在户外与室内环境下保证储能设备的稳定运行。',
        content: `
            <p>储能安全不仅是产品参数，更是端到端的工程体系。电芯的热稳定性、模组的热管理与消防设计，构成了安全的基石。</p>
            <p>在系统层面，推荐采用分层防护架构：</p>
            <ol>
                <li><strong>预防层</strong>：选择通过 UL9540A、IEC62619 等认证的电芯与模组，并配合均衡的散热设计。</li>
                <li><strong>监测层</strong>：实时采集温度、电压、烟雾等数据，通过 AI 算法提前识别异常趋势。</li>
                <li><strong>处置层</strong>：一旦出现异常，快速触发分级切断、气溶胶或水基灭火方案，阻断热失控的扩散。</li>
            </ol>
            <p>结合现场运维管理平台，能够在告警出现前完成预判，让储能成为可靠的能源基础设施。</p>
        `,
    },
    {
        id: 'smart-ems-roadmap',
        title: 'EMS 智能化路线图：让每一度电更有价值',
        image: 'https://lithiumvalley.com/images/20251105_041639_21baa8029ac9.jpg',
        pushDate: '2024-08-02',
        description: '从监控到决策，EMS 如何通过算法迭代提升储能收益与电网友好性。',
        content: `
            <p>优秀的 EMS 不仅仅展示数据，更应该做出决策。通过对电价、天气、负荷与电池状态的综合分析，EMS 可以生成动态调度计划。</p>
            <p>常见的优化目标包括：</p>
            <ul>
                <li>削峰填谷：在高峰时段放电，低谷时段充电，降低需量电费。</li>
                <li>自发自用：与光伏结合，优先消纳绿电，减少回馈损耗。</li>
                <li>备用容量：为关键负荷预留备用电量，提升业务连续性。</li>
            </ul>
            <p>借助云端模型的持续训练，EMS 能够不断迭代策略，并与 BMS 协同保护电池健康，确保经济性与安全性的平衡。</p>
        `,
    },
];

export const blogList: BlogListItem[] = blogPosts.map(({content, ...rest}) => rest);

export function findBlogById(id: string): BlogDetail | undefined {
    return blogPosts.find((post) => post.id === id);
}
