module.exports = {
  cmds: {
    win32: {
      nvidia: "pip install \"InvokeAI[xformers]\" --upgrade --use-pep517 --extra-index-url https://download.pytorch.org/whl/cu121",
      amd: "pip install torch-directml",
      cpu: "pip install InvokeAI --upgrade --use-pep517 --extra-index-url https://download.pytorch.org/whl/cpu"
    },
    linux: {
      nvidia: "pip install \"InvokeAI[xformers]\" --upgrade --use-pep517 --extra-index-url https://download.pytorch.org/whl/cu121",
      amd: "pip install InvokeAI --upgrade --use-pep517 --extra-index-url https://download.pytorch.org/whl/rocm5.4.2",
      cpu: "pip install InvokeAI --upgrade --use-pep517 --extra-index-url https://download.pytorch.org/whl/cpu"
    },
    darwin: "pip install InvokeAI --upgrade --use-pep517"
  },
  run: [{
    method: "shell.run",
    params: {
      venv: "env",
      path: "app",
      message: [
        "{{(platform === 'darwin' ? self.cmds.darwin : (['nvidia', 'amd'].includes(gpu) ? self.cmds[platform][gpu] : self.cmds[platform].cpu))}}",
        "invokeai-configure --yes --root ."
      ]
    }
  }, {
    method: "fs.link",
    params: {
      drive: {
        models: "app/models",
        databases: "app/databases",
        autoimport: "app/autoimport",
        outputs: "app/outputs",
        nodes: "app/nodes",
        text-inversion-output: "app/text-inversion-output",
        text-inversion-training-data: "app/text-inversion-training-data"
      }
    }
  }, {
    method: "notify",
    params: {
      html: "App launched. Click 'start' to get started"
    }
  }]
}
