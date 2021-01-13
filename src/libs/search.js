import $storage from '@/utils/storage'

export function SearchHistory() {
    this.get = () => {
        return $storage.get('search_history') || []
    }
    this.add = (keyword) => {
        let data = this.get();
        if (!keyword) return data;
        let i = data.indexOf(keyword);
        if (i > -1) {
            data.splice(i, 1);
        }
        data.unshift(keyword);
        $storage.set('search_history', data);
        return data;
    }
    this.del = (index) => {
        let data = this.get();
        data.splice(index, 1);
        return data;
    }
    this.clear = () => {
        $storage.remove('search_history');
        return [];
    }
}