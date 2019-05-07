///<reference path="../../../dist/public/js/JWF.d.ts"/>

//ページ読み込み時に実行する処理を設定
addEventListener("DOMContentLoaded", Main)

function Main(){
	let lastId = 0	//取得データの最終ID保存用

	//バックエンドからメッセージを取り出し表示する
	const load = async()=>{
		//指定ID以降のデータをawaitで待機して受け取る
		const result = await adapter.exec('TestModule.get', lastId)
		if(result){
			const client = mainWindow.getClient()
			//受け取ったデータを表示
			for(const value of result){
				client.innerText += `${value.name}:${value.msg}\n`
				lastId = value.id
			}
			//スクロールを最終位置へ設定
			client.scrollTop = client.scrollHeight
		}
	}

	//通信用アダプターの作成
	const adapter = new JWF.Adapter()

	//メインウインドウの作成
	const mainWindow = new JWF.FrameWindow()
	mainWindow.setTitle('メインウインドウ')
	mainWindow.getClient().style.overflow = 'auto'
	mainWindow.setSize(640,480)

	//ユーザ入力用フォームの作成
	const inputWindow = new JWF.TableFormView({frame:true})
	inputWindow.setOrderTop(true)			//ウインドウを常に最上位に
	inputWindow.setTitle('入力ウインドウ')
	inputWindow.setPos()
	//フォームにアイテムを追加
	inputWindow.addItem({ type: 'textbox',name:'name',label:'名前',value:'太郎'})
	inputWindow.addItem({ type: 'textbox',name: 'msg', label: 'メッセージ' })
	inputWindow.addItem({ type: 'submit', name:'submit',label: '送信',
		events:{click:async()=>{
			//送信ボタンクリック時のイベント処理
			const p = inputWindow.getParams()	//フォームパラメータの取得
			const button = inputWindow.getItem('submit') as HTMLButtonElement
			if ((p.msg as string).length){
				button.innerText = '送信中'
				const result = await adapter.exec('TestModule.output',p.name,p.msg)
				if(result)
					button.innerText = '送信成功！'
			}
			load()	//再ロード
		}} })

	load()	//メッセージのロード
}
