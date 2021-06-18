import {MenuModel} from '../models/MenuModel.js'
class MenuController {
    async index(req,res){
        try {
          const menu = await MenuModel.find({}).exec();
          res.json({
            status: 'success',
            data: menu,
          });

          // const data={
          //     imageUrl: 'https://pizza-sicilia.ru/uploads/asset/file/1793/xl_%D0%A1%D1%83%D0%BC%D0%BE%D0%BA%D1%83.jpg',
          //     name: 'Сумоку',
          //     description:'Микс на выбор, лосось копчёный, сливочный сыр, майонез, огурец, икра масаго, такуан, соус манго-лайм',
          //     types: 'Жареные и запечённые роллы',
          //     sizes: [
          //
          //     ],
          //     weight: [
          //        230
          //     ],
          //     price: [
          //        315
          //     ],
          //     carousel: [
          //        'https://pizza-sicilia.ru/uploads/asset/file/1793/xl_%D0%A1%D1%83%D0%BC%D0%BE%D0%BA%D1%83.jpg',
          //     ],
          //     badge: [
          //        'HOT','NEW'
          //     ],
          // }
          //
          // await MenuModel.create(data);

        } catch (error) {
          res.status(500).json({
            status: 'error',
            message: error,
          });
        }
      }
}

export const MenuCtrl = new MenuController();