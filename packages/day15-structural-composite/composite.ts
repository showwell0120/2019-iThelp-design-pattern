abstract class AbstractMenu {
    protected parent: AbstractMenu;

    public setParent(parent: AbstractMenu) {
        this.parent = parent;
    }
    public getParent(): AbstractMenu {
        return this.parent;
    }

    public add(menus: AbstractMenu[]): void { }
    public remove(menu: AbstractMenu): void { }

    public isComposite(): boolean {
        return true;
    }

    public abstract printContent(): string;
}

const DefaultWording = {
    type: '肥肥麵線＆壹LAN拉麵 聯合菜單',
    description: '兩家一起點，讓你好方便！'
}

class CompositeMenu extends AbstractMenu {
    protected type: string;
    protected description: string;
    protected children: AbstractMenu[] = [];

    constructor(type: string = DefaultWording.type, description: string = DefaultWording.description) {
        super();
        this.type = type;
        this.description = description;
    }

    public add(items: AbstractMenu[]): void {
        const me = this;
        this.children = [...this.children, ...items];
        this.children.map(child => child.setParent(me));
    }
    public remove(item: AbstractMenu): void {
        const itemIndex = this.children.indexOf(item);
        this.children.splice(itemIndex, 1);
        item.setParent(null);
    }

    public printContent(): string {
        let results: string = `\n[${this.type}] ${this.description}\n`;
        for (const child of this.children) {
            results = results.concat(`${child.printContent()}\n`)
        }
        return results
    }
}

class Product extends AbstractMenu {
    protected name: string;
    protected price: number;

    constructor(name: string, price: number) {
        super();
        this.name = name;
        this.price = price;
    }

    public isComposite(): boolean {
        return false;
    }

    public printContent(): string {
        return `- ${this.name} ${this.price}元`;
    }
}

function makeMenu() {
    const vermicelliProduct1 = new Product('大腸口味', 40);
    const vermicelliProduct2 = new Product('蚵仔口味', 40);
    const vermicelliMenu = new CompositeMenu('麵線', '');
    vermicelliMenu.add([vermicelliProduct1, vermicelliProduct2]);

    const drinkProduct1 = new Product('古早味紅茶', 20);
    const drinkProduct2 = new Product('彈珠汽水', 30);
    const drinkMenu = new CompositeMenu('涼飲', '');
    drinkMenu.add([drinkProduct1, drinkProduct2]);

    const FatFatMenu = new CompositeMenu('肥肥麵線攤', '想吃點台味來這邊');
    FatFatMenu.add([vermicelliMenu, drinkMenu]);

    const ramenProduct1 = new Product('壹LAN特製拉麵', 120);
    const ramenProduct2 = new Product('鮭魚味噌湯', 40);
    const IChiRanMenu = new CompositeMenu('壹LAN拉麵店', 'ようこそ、こちらへ！');
    IChiRanMenu.add([ramenProduct1, ramenProduct2]);

    const linkedInMenu = new CompositeMenu();
    linkedInMenu.add([IChiRanMenu, FatFatMenu]);

    console.log(linkedInMenu.printContent())
}

makeMenu();

