import { cates, cates_brand } from "@/libs/cate";

const hdkChannels = [{
        id: 1,
        title: "实时销量榜",
        method: "sales_list",
        type: 1,
        cate: cates,
    },
    {
        id: 2,
        title: "今日爆单榜",
        method: "sales_list",
        type: 2,
        cate: cates,
    },
    {
        id: 3,
        title: "昨日爆单榜",
        method: "sales_list",
        type: 3,
        cate: cates,
    },
    {
        id: 4,
        title: "出单指数版",
        method: "sales_list",
        type: 4,
        cate: cates,
    },
    {
        id: 5,
        title: "超值买",
        method: "get_buyreturn_items",
    },
    {
        id: 6,
        title: "实时佣金榜",
        method: "get_current_commission",
        cate: cates,
    },
    {
        id: 7,
        title: "定向计划",
        method: "get_orienteeringitems",
        cate: cates,
    },
    {
        id: 8,
        title: "高佣专场",
        method: "get_highitems",
        cate: cates,
    },
    {
        id: 9,
        title: "精选低价",
        method: "low_price_Pinkage_data",
        type: 1,
    },
    {
        id: 10,
        title: "9.9包邮",
        method: "low_price_Pinkage_data",
        type: 2,
    },
    {
        id: 11,
        title: "6.9包邮",
        method: "low_price_Pinkage_data",
        type: 3,
    },
    {
        id: 12,
        title: "3.9包邮",
        method: "low_price_Pinkage_data",
        type: 4,
    },
    {
        id: 13,
        title: "偏远包邮",
        method: "get_free_shipping_data",
        cate: cates,
    },
    {
        id: 14,
        title: "品牌特惠",
        method: "brand",
        cate: cates_brand,
    },
    {
        id: 15,
        title: "限时秒杀",
        method: "fastbuy",
    },
    {
        id: 16,
        title: "精选好货",
        method: "tb_items_material_data",
        type: 1,
    },
    {
        id: 17,
        title: "大额神券",
        method: "tb_items_material_data",
        type: 2,
    },
    {
        id: 18,
        title: "9.9",
        method: "tb_items_material_data",
        type: 3,
    },
    {
        id: 19,
        title: "时尚女装",
        method: "tb_items_material_data",
        type: 4,
    },
    {
        id: 20,
        title: "潮流男装",
        method: "tb_items_material_data",
        type: 5,
    },
    {
        id: 21,
        title: "精致潮鞋",
        method: "tb_items_material_data",
        type: 6,
    },
];
export {
    hdkChannels
}