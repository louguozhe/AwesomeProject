import {FLAG_STORAGE} from '../dao/DataRepository'
export default class ActionUtils {
    /**
     * 跳转到详情页
     * @param params 要传递的一些参数
     */
    static onSelectRepository(params) {
        const { navigate } = params.navigation;
        console.log('onSelectRepository.params: ',params)
        navigate('RepositoryDetail',
            {...params}
        );
    }
    /**
     * favoriteIcon单击回调函数
     * @param item
     * @param isFavorite
     */
    static onFavorite(favoriteDao,item, isFavorite,flag) {
        var key=flag===FLAG_STORAGE.flag_trending? item.fullName:item.id.toString();
        if (isFavorite) {
            favoriteDao.saveFavoriteItem(key, JSON.stringify(item));
        } else {
            favoriteDao.removeFavoriteItem(key);
        }
    }
}