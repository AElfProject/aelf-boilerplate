var target = Argument("target", "Default");
var rootPath     = "./";
var srcPath      = rootPath + "chain/src/";
var contractPath = rootPath + "chain/contract/";
var testPath     = rootPath + "chain/test/";
var distPath     = rootPath + "chain/aelf-node/";
var solution     = rootPath + "chain/AElf.Boilerplate.sln";
var srcProjects  = GetFiles(srcPath + "**/*.csproj");
var contractProjects  = GetFiles(contractPath + "**/*.csproj");

Task("Clean")
    .Description("clean up project cache")
    .Does(() =>
{
    DeleteFiles(distPath + "*.nupkg");
    CleanDirectories(srcPath + "**/bin");
    CleanDirectories(srcPath + "**/obj");
    CleanDirectories(contractPath + "**/bin");
    CleanDirectories(contractPath + "**/obj");
    CleanDirectories(testPath + "**/bin");
    CleanDirectories(testPath + "**/obj");
});

Task("Restore")
    .Description("restore project dependencies")
    .Does(() =>
{
    var restoreSettings = new DotNetCoreRestoreSettings{
        ArgumentCustomization = args => {
            return args.Append("-v quiet");}
};
    DotNetCoreRestore(solution,restoreSettings);
});

Task("Build")
    .Description("Compilation project")
    .IsDependentOn("Clean")
    .IsDependentOn("Restore")
    .Does(() =>
{
    var buildSetting = new DotNetCoreBuildSettings{
        NoRestore = true,
        ArgumentCustomization = args => {
            return args.Append("/clp:ErrorsOnly")
                       .Append("-v quiet");}
    };
     
    DotNetCoreBuild(solution, buildSetting);
});


Task("Run-Unit-Tests")
    .Description("operation test")
    .IsDependentOn("Build")
    .Does(() =>
{
    var testSetting = new DotNetCoreTestSettings{
        NoRestore = true,
        NoBuild = true,
        ArgumentCustomization = args => {
            return args.Append("--logger trx");
        }
};
    var testProjects = GetFiles("./chain/test/*.Tests/*.csproj");


    foreach(var testProject in testProjects)
    {
        DotNetCoreTest(testProject.FullPath, testSetting);
    }
});
Task("Default")
    .IsDependentOn("Run-Unit-Tests");

RunTarget(target);
