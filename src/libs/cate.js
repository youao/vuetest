const cates = ['精选', '女装', '男装', '内衣', '美妆', '配饰', '鞋品', '箱包', '儿童', '母婴', '居家', '美食', '数码', '家电', '其他', '车品', '文体', '宠物'];
const cates_brand = ['精选', '母婴童品', '百变女装', '食品酒水', '居家日用', '美妆洗护', '品质男装', '舒适内衣', '箱包配饰', '男女鞋靴', '宠物用品', '数码家电', '车品文体'];
const cates_hour = [
    { hour: 6, title: '0:00' },
    { hour: 7, title: '10:00' },
    { hour: 8, title: '12:00' },
    { hour: 9, title: '15:00' },
    { hour: 10, title: '20:00' },
];
export {
    cates,
    cates_brand,
    cates_hour
}

export function cateAll() {
    return cates.map((item, index) => {
        return {
            title: item,
            cid: index,
        };
    });
}

export function cateList(cate = cates, type) {
    if (typeof cate == 'number') {
        let arr = [];
        for (let i = 0; i < cate; i++) {
            arr.push({
                page: 1,
                pageSize: 10,
                list: [],
                loading: false,
                finished: false,
            });
        }
        return arr;
    }
    return cate.map((item, index) => {
        return {
            title: type == 'hour' ? item.title : item,
            cid: type == 'hour' ? 0 : index,
            page: 1,
            pageSize: 10,
            list: [],
            loading: false,
            finished: false,
        };
    });
}

export function HourData() {
    this.getActive = () => {
        const h = new Date().getHours();
        const ln = cates_hour.length;
        for (let i = 1; i < ln; i++) {
            if (h < cates_hour[i].title && h >= cates_hour[i - 1].title) {
                return i - 1;
            }
        }
        return ln - 1;
    };
    this.getCates = () => {
        return cates_hour.map((item, index) => {
            let sub = "";
            if (index < this.active) {
                sub = "已开抢";
            } else if (index == this.active) {
                sub = "疯抢中";
            } else {
                sub = "即将开抢";
            }
            item.sub = sub;
            return item;
        });
    };

    this.active = this.getActive();
    this.cates = this.getCates();
}