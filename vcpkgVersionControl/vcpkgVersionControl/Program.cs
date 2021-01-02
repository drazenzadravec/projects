using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace vcpkgVersionControl
{
    /// <summary>
    /// Entry point
    /// </summary>
    class Program
    {
        /// <summary>
        /// Main entry point.
        /// </summary>
        /// <param name="args">Arguments.</param>
        static void Main(string[] args)
        {
            // must have too arguments.
            if (args != null && args.Length > 1)
            {
                long count = 1;
                string packageBaseFolder = args[0].Trim().TrimEnd(new char[] { '\\' }) + "\\";
                string destinationBaseFolder = args[1].Trim().TrimEnd(new char[] { '\\' }) + "\\";

                // read the packageFolder.
                var packageFolders = System.IO.Directory.EnumerateDirectories(packageBaseFolder);
                foreach (var folder in packageFolders)
                {
                    try
                    {
                        Console.CursorLeft = 0;
                        Console.Write(new string(' ', Console.WindowWidth - 10));
                        Console.CursorLeft = 0;
                        Console.Write((count++).ToString() + " of " + packageFolders.Count().ToString() + ", " + folder);

                        string runtimeLibs = null;

                        // open the BUILD_INFO file
                        string[] build_infoLines = System.IO.File.ReadAllLines(folder.Trim().TrimEnd(new char[] { '\\' }) + "\\" + "BUILD_INFO");

                        // open the CONTROL file
                        string[] controlLines = System.IO.File.ReadAllLines(folder.Trim().TrimEnd(new char[] { '\\' }) + "\\" + "CONTROL");

                        // if lines.
                        if (build_infoLines != null && build_infoLines.Length > 0)
                        {
                            // for each line look for runtime.
                            foreach (var runtimeLib in build_infoLines)
                            {
                                // find dynamic.
                                if (runtimeLib.Trim().ToLower().Contains("dynamic".ToLower()))
                                {
                                    runtimeLibs = "dynamic";
                                    break;
                                }

                                // find static.
                                if (runtimeLib.Trim().ToLower().Contains("static".ToLower()))
                                {
                                    runtimeLibs = "static";
                                    break;
                                }
                            }

                            // if runtime found.
                            if (!String.IsNullOrEmpty(runtimeLibs))
                            {
                                string package = null;
                                string version = null;
                                string architecture = null;

                                // if lines.
                                if (controlLines != null && controlLines.Length > 0)
                                {
                                    package = controlLines[0].Trim().Split(new char[] { ':' })[1].Trim();
                                    version = controlLines[1].Trim().Split(new char[] { ':' })[1].Trim();
                                    architecture = null;

                                    // find architecture.
                                    foreach (var control in controlLines)
                                    {
                                        // find architecture.
                                        if (control.Trim().ToLower().Contains("Architecture".ToLower()))
                                        {
                                            architecture = control.Trim();
                                            break;
                                        }
                                    }

                                    // if arch
                                    if (!String.IsNullOrEmpty(architecture))
                                    {
                                        string[] architectures = architecture.Split(new char[] { ':' });

                                        // split architecture.
                                        string architectureMachine = architectures[1].Split(new char[] { '-' })[0].Trim();
                                        string architecturePlatform = architectures[1].Split(new char[] { '-' })[1].Trim();

                                        // single package.
                                        string packageBase = package; //.Split(new char[] { '-' })[0].Trim();

                                        // current destination folder
                                        string destinationFolder = destinationBaseFolder + packageBase + "\\" + architecturePlatform + "\\" +
                                            architectureMachine + "\\" + runtimeLibs + "\\" + version + "\\";

                                        // create folder.
                                        if (!System.IO.Directory.Exists(destinationFolder))
                                        {
                                            System.IO.Directory.CreateDirectory(destinationFolder);
                                        }

                                        // copy contents.
                                        DirectoryCopy(folder.Trim().TrimEnd(new char[] { '\\' }) + "\\", destinationFolder, true);
                                    }
                                }
                            }
                        }
                    }
                    catch (Exception ex) { var exc = ex.Message; }
                };
            }
        }

        /// <summary>
        /// Copy the directory.
        /// </summary>
        /// <param name="sourceDirName">Source.</param>
        /// <param name="destDirName">Destination.</param>
        /// <param name="copySubDirs">Copy sub directories</param>
        private static void DirectoryCopy(string sourceDirName, string destDirName, bool copySubDirs)
        {
            // Get the subdirectories for the specified directory.
            DirectoryInfo dir = new DirectoryInfo(sourceDirName);

            if (!dir.Exists)
            {
                throw new DirectoryNotFoundException(
                    "Source directory does not exist or could not be found: "
                    + sourceDirName);
            }

            DirectoryInfo[] dirs = dir.GetDirectories();

            // If the destination directory doesn't exist, create it.       
            Directory.CreateDirectory(destDirName);

            // Get the files in the directory and copy them to the new location.
            FileInfo[] files = dir.GetFiles();
            foreach (FileInfo file in files)
            {
                // do not copy pdb files.
                if (file.Extension.ToLower() != ".pdb".ToLower() &&
                    file.Name.ToLower() != "CONTROL".ToLower() &&
                    file.Name.ToLower() != "BUILD_INFO".ToLower())
                {
                    string tempPath = Path.Combine(destDirName, file.Name);
                    file.CopyTo(tempPath, true);
                }
            }

            // If copying subdirectories, copy them and their contents to new location.
            if (copySubDirs)
            {
                foreach (DirectoryInfo subdir in dirs)
                {
                    // do not copy share folder.
                    if (subdir.Name.ToLower() != "share".ToLower() &&
                        subdir.Name.ToLower() != "pkgconfig".ToLower())
                    {
                        string tempPath = Path.Combine(destDirName, subdir.Name);
                        DirectoryCopy(subdir.FullName, tempPath, copySubDirs);
                    }
                }
            }
        }
    }
}
