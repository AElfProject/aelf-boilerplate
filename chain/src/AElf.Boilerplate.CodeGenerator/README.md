# What's this project?

This project can help developers generate contract project and related test project automatically.

# How to use this Code Generator?

1. Modify `Content` node of appsetting.json in this project via IDE, tune `New` values as you wish. Like,

``` json
    "Contents": [
      {
        "Origin": "AElf.Contracts.HelloWorldContract",
        "New": "Ean.Contracts.NovelWritingContract"
      },
      {
        "Origin": "HelloWorld",
        "New": "NovelWriting"
      },
      {
        "Origin": "hello_world",
        "New": "novel_writing"
      }
    ],
```

2. Simply run `AElf.Boilerplate.CodeGenerator` project via IDE.

3. Then you will find a `AElf.Contracts.NovelWritingContract.sln` in aelf-boilerplate\chain folder.

4. Finally you can use the new solution to develop your contract.