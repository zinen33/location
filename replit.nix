{ pkgs }: {
	deps = [
  pkgs.nano
  pkgs.nodejs-14_x
  pkgs.nodePackages.typescript-language-server
  pkgs.yarn
  pkgs.replitPackages.jest
  pkgs.libuuid
	];
  env = { LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [pkgs.libuuid];  };
}
