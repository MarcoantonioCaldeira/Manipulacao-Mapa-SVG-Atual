const teste = {
    32:"32",
    33:"33",
    34:"34",
    35:"35",
    36: () => {
        console.log('id foi 36');
    }
}

const func = (id) => {
    console.log(teste[id]);
}

func(30);