# 如何使用该代码生成器

1. 使用IDE编辑该目录下的appsetting.json文件的`Content`节点，比如试图实现一个名为NovelWriting的合约，就这么写：

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

2. 使用IDE运行一下`AElf.Boilerplate.CodeGenerator`项目。

3. 接下来你会在`aelf-boilerplate\chain`路径下发现一个名为`AElf.Contracts.NovelWritingContract.sln`的文件。

4. 打开新生成的解决方案文件，就可以开始合约开发了。