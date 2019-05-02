import * as amf from 'active-module-framework'

/**
 *テストモジュール
 *
 * @export
 * @class TestModule
 * @extends {amf.Module}
 */
export class TestModule extends amf.Module {
	//プログラム起動時に一回だけ呼ばれる
	static async onCreateModule(): Promise<boolean> {
		//ローカルDB(SQLite)の初期設定
		const localDB = amf.Module.getLocalDB()
		const result = await localDB.run(
			'CREATE TABLE IF NOT EXISTS ModuleTest (id integer primary key,name text,msg text)').
				catch(()=>{return null})
		return result!=null;
	}
	//頭に「JS_」を付けると、フロントエンドと通信するためのメソッドとなる
	async JS_output(name:string,msg:string){
		const localDB = amf.Module.getLocalDB()
		const result = await localDB.run("insert into ModuleTest values(null,?,?)", name, msg).
			catch(() => { return null })
		return result !== null
	}
	async JS_get(id?){
		if(id == null)
			id = 0
		const localDB = amf.Module.getLocalDB()
		return await localDB.all("select * from ModuleTest where id > ? order by id",id)
	}
}
